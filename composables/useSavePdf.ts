import fileSaver from "file-saver";
// https://github.com/crabbly/print.js
import printjs from "print-js";
import { ENDPOINT_GRAPHQL } from "@/config";

interface IPdfDataInput {
  filename?: string;
  data: Record<string, any>;
}

const { saveAs } = fileSaver;

const query = `
  query Q_pdfDownload($data: JsonData!) {
    pdfDownload(data: $data)
  }
`;
export const useSavePdf = () => {
  const auth = useStoreApiAuth();
  const {
    pdf: { DEFAULT_DOWNLOAD_FILENAME },
  } = useAppConfig();
  const { watchProcessing } = useStoreAppProcessing();
  const procSavePdf = useProcessMonitor();
  watchProcessing(procSavePdf.processing);
  const pdf = async (options: IPdfDataInput) => {
    let d;
    try {
      procSavePdf.begin();
      d = get(
        await $fetch(ENDPOINT_GRAPHQL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.token$}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: {
            query,
            variables: {
              data: options.data,
            },
          },
        }),
        "data.pdfDownload"
      );
    } catch (error) {
      procSavePdf.setError(error);
    } finally {
      procSavePdf.done();
    }
    if (!procSavePdf.error.value) procSavePdf.successful();
    return d;
  };
  // render pdf endpoint
  //  load data in --headless chrome;
  //   save bytes client side
  const savePdf = async ({
    // .filename .data{}
    filename = DEFAULT_DOWNLOAD_FILENAME,
    data = {},
  }: IPdfDataInput) => {
    const d = await pdf({ data });
    try {
      procSavePdf.begin();
      const bs = atob(d ? String(d) : "");
      const len = bs.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = bs.charCodeAt(i);
      }
      saveAs(new Blob([bytes.buffer]), filename);
    } catch (error) {
      procSavePdf.setError(error);
    } finally {
      procSavePdf.done();
    }
    if (!procSavePdf.error.value) procSavePdf.successful();
  };
  const printPdf = async (options: IPdfDataInput) =>
    printjs({ printable: await pdf(options), type: "pdf", base64: true });
  return {
    error: procSavePdf.error,
    savePdf,
    printPdf,
    pdf,
  };
};
