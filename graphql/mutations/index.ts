export const M_STORAGE_FILE_REMOVE = gql`
  mutation m_storageRemoveFile($fileID: String!) {
    storageRemoveFile(file_id: $fileID) {
      error
      file {
        id
        data {
          file_id
        }
      }
    }
  }
`;

export const M_docsUpsert = gql`
  mutation m_docsUpsert($topic: String!, $data: JsonData!, $id: ID) {
    docsUpsert(topic: $topic, data: $data, id: $id)
  }
`;

export const M_docsRm = gql`
  mutation m_docsRm($topic: String!, $id: ID!) {
    docsRm(topic: $topic, id: $id)
  }
`;

export const M_docUpsert = gql`
  mutation m_docUpsert($doc_id: String!, $data: JsonData!, $merge: Boolean!, $shallow: Boolean!) {
    docUpsert(doc_id: $doc_id, data: $data, merge: $merge, shallow: $shallow)
  }
`;

export const M_docsUsersAdd = gql`
  mutation m_docsUsersAdd($email: String!, $password: String!) {
    docsUsersAdd(email: $email, password: $password)
  }
`;

export const M_docsTags = gql`
  mutation m_docsTags($id: ID!, $tags: JsonDocsTags!) {
    docsTags(id: $id, tags: $tags)
  }
`;

export const M_docsRmById = gql`
  mutation m_docsRmById($id: ID!) {
    docsRmById(id: $id)
  }
`;

export const M_productsUpsert = gql`
  mutation m_productsUpsert($data: InputProduct!, $id: ID) {
    productsUpsert(data: $data, id: $id) {
      id
      user_id
      name
      price
      stock
      stockType
      onSale
      description
      created_at
      updated_at
    }
  }
`;

export const M_productsRemove = gql`
  mutation m_productsRemove($id: ID!) {
    productsRm(id: $id) {
      id
      user_id
      name
      price
      stock
      stockType
      onSale
      description
      created_at
      updated_at
    }
  }
`;

export const M_ordersPlace = gql`
  mutation m_ordersPlace($data: JsonData!, $items: JsonData!) {
    ordersPlace(data: $data, items: $items)
  }
`;

export const M_postsUpsert = gql`
  mutation m_postsUpsert($data: InputPost!, $id: ID) {
    postsUpsert(data: $data, id: $id) {
      id
      title
      content
      user_id
      tags
      docs
      created_at
      updated_at
    }
  }
`;

export const M_postsRemove = gql`
  mutation m_postsRemove($id: ID!) {
    postsRemove(id: $id) {
      id
      title
      content
      user_id
      created_at
      updated_at
    }
  }
`;

export const M_postsImagesDrop = gql`
  mutation m_postsImagesDrop($id: ID!) {
    postsImagesDrop(id: $id) {
      id
      title
      content
      user_id
      created_at
      updated_at
    }
  }
`;

export const M_packagesSetPromoted = gql`
  mutation m_packagesSetPromoted($pid: ID!, $status: Boolean!) {
    packagesSetPromoted(pid: $pid, status: $status)
  }
`;

export const M_manageOrder = gql`
  mutation m_manageOrder($oid: ID!, $data: JsonData!) {
    manageOrderData(oid: $oid, data: $data) {
      id
      user_id
      code
      description
      completed
      canceled
      status
      delivery_at
      created_at
      updated_at
    }
  }
`;

export const M_orderProductsStatusByCompany = gql`
  mutation m_orderProductsStatusByCompany($oid: ID!, $uid: ID!, $status: Int!) {
    orderProductsStatusByCompany(oid: $oid, uid: $uid, status: $status)
  }
`;

export const M_orderProductsDeliveryDateByCompany = gql`
  mutation m_orderProductsDeliveryDateByCompany(
    $oid: ID!
    $uid: ID!
    $date: String!
  ) {
    orderProductsDeliveryDateByCompany(oid: $oid, uid: $uid, date: $date)
  }
`;

export const M_accountsArchive = gql`
  mutation m_accountsArchive($uid: ID!) {
    accountsArchive(uid: $uid)
  }
`;

export const M_accountsDrop = gql`
  mutation m_accountsDrop($uid: ID!) {
    accountsDrop(uid: $uid)
  }
`;

export const M_accountsSendVerifyEmailLink = gql`
  mutation m_accountsSendVerifyEmailLink($uid: ID!, $url: String!) {
    accountsSendVerifyEmailLink(uid: $uid, url: $url)
  }
`;

export const M_accountsVeifyEmail = gql`
  mutation m_accountsVeifyEmail($data: JsonData!) {
    accountsVeifyEmail(data: $data)
  }
`;

export const M_accountsUpgradeUserCompany = gql`
  mutation m_accountsUpgradeUserCompany($uid: ID!) {
    accountsUpgradeUserCompany(uid: $uid)
  }
`;

export const M_ordersSetCompleted = gql`
  mutation m_ordersSetCompleted($oid: ID!, $completed: Boolean) {
    ordersSetCompleted(oid: $oid, completed: $completed)
  }
`;

export const M_sendMail = gql`
  mutation m_sendMail($subject: String!, $template: String!, $data: JsonData!) {
    sendmail(subject: $subject, template: $template, data: $data) {
      error
      status
    }
  }
`;

