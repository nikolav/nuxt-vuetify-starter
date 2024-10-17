export const Q_statusCheck = gql`
  query q_statusCheck {
    status
  }
`;

export const Q_vars = gql`
  query q_vars {
    vars {
      id
      name
      value
    }
  }
`;

export const Q_storageList = gql`
  query q_storageList {
    storageList {
      id
      file_id
      title
      description
      filename
      path
      size
      mimetype
      public
      created_at
      updated_at
    }
  }
`;

export const Q_storageListAll = gql`
  query q_storageListAll {
    storageListAll {
      id
      file_id
      title
      description
      filename
      path
      size
      mimetype
      public
      created_at
      updated_at
    }
  }
`;

export const Q_docsByTopic = gql`
  query q_docsByTopic($topic: String!, $order: Int) {
    docsByTopic(topic: $topic, order: $order)
  }
`;

export const Q_docByDocId = gql`
  query q_docByDocId($doc_id: String!) {
    docByDocId(doc_id: $doc_id)
  }
`;

export const Q_tagsByDocId = gql`
  query q_tagsByDocId($id: ID!) {
    tagsByDocId(id: $id)
  }
`;

export const Q_productsByUser = gql`
  query q_productsByUser($user_id: ID!) {
    productsListByUser(user_id: $user_id) {
      id
      user_id
      name
      description
      price
      price_history
      stockType
      stock
      onSale
      tags
      created_at
      updated_at
    }
  }
`;

export const Q_productsListAll = gql`
  query q_productsListAll {
    productsListAll {
      id
      name
      price
      price_history
      description
      stockType
      stock
      onSale
      user_id
      user {
        id
        email
        created_at
        updated_at
      }
      tags
      docs
      created_at
      updated_at
    }
  }
`;

export const Q_productsListAllPrices = gql`
  query q_productsListAllPrices {
    productsListAll {
      id
      price
    }
  }
`;

export const Q_productsListExact = gql`
  query q_productsListExact($products: [ID!]!) {
    productsListExact(products: $products) {
      id
      user_id
      name
      description
      price
      price_history
      stockType
      stock
      onSale
      tags
      user {
        id
        email
        created_at
        updated_at
      }
      created_at
      updated_at
    }
  }
`;

export const Q_productsListPopular = gql`
  query q_productsListPopular($length: Int) {
    productsListPopular(length: $length) {
      id
      user_id
      name
      description
      price
      price_history
      stockType
      stock
      onSale
      tags
      user {
        id
        email
        created_at
        updated_at
      }
      created_at
      updated_at
    }
  }
`;

export const Q_ordersReceived = gql`
  query q_ordersReceived {
    ordersReceived {
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

export const Q_ordersReceivedProducts = gql`
  query q_ordersReceivedProducts($order_id: ID!) {
    ordersReceivedProducts(order_id: $order_id) {
      amount
      id
      user_id
      name
      price
      price_history
      stock
      stockType
      onSale
      description
      tags
      created_at
      updated_at
    }
  }
`;

export const Q_usersSingle = gql`
  query q_usersSingle($uid: ID!) {
    usersById(uid: $uid) {
      id
      email
      products {
        id
        user_id
        name
        price
        price_history
        stock
        stockType
        onSale
        description
        tags
        created_at
        updated_at
      }
      created_at
      updated_at
    }
  }
`;

export const Q_postsList = gql`
  query q_postsList($uid: ID) {
    postsList(uid: $uid) {
      id
      title
      content
      user_id
      user {
        id
        email
      }
      tags
      docs
      created_at
      updated_at
    }
  }
`;

export const Q_postsImages = gql`
  query q_postsImages($id: ID) {
    postsImages(id: $id)
  }
`;

export const Q_productsListByTags = gql`
  query q_productsListByTags($tags: [String!]!) {
    productsListByTags(tags: $tags) {
      id
      name
      price
      price_history
      description
      stockType
      stock
      onSale
      user_id
      user {
        id
        email
        created_at
        updated_at
      }
      tags
      docs
      created_at
      updated_at
    }
  }
`;

export const Q_ordersListByUser = gql`
  query q_ordersListByUser($uid: ID!) {
    ordersListByUser(uid: $uid) {
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

export const Q_ordersProducts = gql`
  query q_ordersProducts($oid: ID!) {
    ordersProducts(oid: $oid) {
      amount
      id
      user_id
      user {
        id
        email
        created_at
        updated_at
      }
      name
      price
      price_history
      stock
      stockType
      onSale
      description
      tags
      created_at
      updated_at
    }
  }
`;

export const Q_productsSearch = gql`
  query q_productsSearch($query: JsonData) {
    productsSearch(query: $query) {
      id
      name
      price
      price_history
      description
      stockType
      stock
      onSale
      user_id
      user {
        id
        email
        created_at
        updated_at
      }
      tags
      docs
      created_at
      updated_at
    }
  }
`;

export const Q_productsTotalAmountOrdered = gql`
  query q_productsTotalAmountOrdered($pid: ID!) {
    productsTotalAmountOrdered(pid: $pid) {
      amount
    }
  }
`;

export const Q_companiesList = gql`
  query q_companiesList($approved: Boolean, $district: String, $all: Boolean) {
    companiesList(approved: $approved, district: $district, all: $all) {
      id
      email
      products {
        id
        name
        user_id
        price
        price_history
        stock
        stockType
        onSale
        description
        tags
        docs
        created_at
        updated_at
      }
      posts {
        id
        title
      }
      created_at
      updated_at
    }
  }
`;

export const Q_companiesCountedByDistrict = gql`
  query q_companiesCountedByDistrict {
    companiesCountedByDistrict
  }
`;

export const Q_packagesIsPromoted = gql`
  query q_packagesIsPromoted($pid: ID!) {
    packagesIsPromoted(pid: $pid)
  }
`;

export const Q_productsPromo = gql`
  query q_productsPromo {
    productsListPromo {
      id
      name
      price
      price_history
      description
      stockType
      stock
      onSale
      user_id
      user {
        id
        email
        created_at
        updated_at
      }
      tags
      docs
      created_at
      updated_at
    }
  }
`;

export const Q_ordersOne = gql`
  query q_ordersOne($oid: ID!) {
    ordersOne(oid: $oid) {
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

export const Q_getOrderProductsStatusByCompany = gql`
  query q_getOrderProductsStatusByCompany($oid: ID!, $uid: ID!) {
    getOrderProductsStatusByCompany(oid: $oid, uid: $uid)
  }
`;

export const Q_getOrderProductsDeliveryDate = gql`
  query q_getOrderProductsDeliveryDate($oid: ID!, $uid: ID!) {
    getOrderProductsDeliveryDate(oid: $oid, uid: $uid)
  }
`;

export const Q_accountsIncompleteProfileFields = gql`
  query q_accountsIncompleteProfileFields {
    accountsIncompleteProfileFields
  }
`;

export const Q_postsListOnly = gql`
  query q_postsListOnly($sids: [ID!]!) {
    postsListOnly(sids: $sids) {
      id
      title
      content
      user_id
      user {
        id
        email
        created_at
        updated_at
      }
      tags
      docs
      created_at
      updated_at
    }
  }
`;

export const Q_apiStatus = gql`
  query q_apiStatus {
    status
  }
`;

/////////////
/////////////
/////////////

export const Q_usersOnly = gql`
  query q_usersOnly($uids: [ID!]!) {
    usersOnly(uids: $uids) {
      id
      email
      profile
      is_approved
      is_manager
      is_admin
      is_external
      is_available
      tags
      groups
      email_verified
      created_at
      updated_at
    }
  }
`;

export const Q_users = gql`
  query q_users {
    users {
      id
      email
      profile
      is_approved
      is_manager
      is_admin
      is_external
      is_available
      tags
      groups
      email_verified
      created_at
      updated_at
    }
  }
`;

export const Q_productsList = gql`
  query q_productsList($pids: [ID!]) {
    productsList(pids: $pids) {
      id
      name
      code
      type
      location
      status
      condition
      data
      notes
      users {
        id
        email
        profile
        is_approved
        is_manager
        is_admin
        is_external
        is_available
        tags
        groups
        created_at
        updated_at
      }
      author {
        id
        email
        profile
        is_approved
        is_manager
        is_admin
        is_external
        is_available
        tags
        groups
        created_at
        updated_at
      }
      tags
      docs
      created_at
      updated_at
    }
  }
`;

export const Q_groupsList = gql`
  query q_groupsList($gids: [ID!]) {
    groupsList(gids: $gids) {
      id
      name
      code
      type
      location
      status
      condition
      data
      notes
      users {
        id
        email
        profile
        is_approved
        is_manager
        is_admin
        is_external
        is_available
        tags
        groups
        created_at
        updated_at
      }
      author {
        id
        email
        profile
        is_approved
        is_manager
        is_admin
        is_external
        is_available
        tags
        groups
        created_at
        updated_at
      }
      tags
      docs
      created_at
      updated_at
    }
  }
`;

// assetsList(aids: [ID!], type: String): [Asset!]!
export const Q_assetsList = gql`
  query q_assetsList($aids: [ID!], $type: String) {
    assetsList(aids: $aids, type: $type) {
      id
      name
      code
      type
      location
      status
      condition
      data
      notes
      tags
      author {
        id
        email
        profile
        is_approved
        is_manager
        is_admin
        is_external
        is_available
        tags
        groups
        created_at
        updated_at
      }
      users {
        id
        email
        profile
        is_approved
        is_manager
        is_admin
        is_external
        is_available
        tags
        groups
        created_at
        updated_at
      }
      docs
      created_at
      updated_at
    }
  }
`;

