import {gql} from "@apollo/client"

export const USER_LOGIN = gql`
  query ($password: String!, $email: String!) {
    users(where: {password: {_eq: $password}, email: {_eq: $email}}) {
      id
      name
      email
      password
    }
  }
`

export const USER_REGISTER = gql`
  mutation ($email: String!, $name: String!, $password: String!) {
    insert_users(objects: {email: $email, name: $name, password: $password}) {
      affected_rows
    }
  }
`

export const GET_BOOKS = gql`
  query ($limit: Int!, $offset: Int!) {
    books (limit: $limit, offset: $offset) {
      id
      title
      author
      image
    }
  }
`

export const GET_BOOK_ID = gql`
  query($id: Int!) {
    books(where: {id: {_eq: $id}}) {
      ISBN
      author
      genre
      id
      image
      title
    }
  }
`

export const GET_BOOKS_COUNT = gql`
  query {
    books_aggregate {
      aggregate {
        count(columns: id)
      }
    }
  }
`

export const GET_MY_RENT = gql`
  query ($id: Int!) {
    users(where: {id: {_eq: $id}}) {
      rents {
        id
        return_date
        returned
        book {
          title
          author
          image
        }
      }
    }
  }
`

export const RENT_BOOK = gql`
  mutation ($book_id: Int!, $return_date: date!, $user_id: Int!) {
    insert_rents(objects: {book_id: $book_id, return_date: $return_date, user_id: $user_id}) {
      affected_rows
    }
  }
`

export const UPDATE_RENT = gql`
  mutation ($id: Int!) {
    update_rents_by_pk(pk_columns: {id: $id}, _set: {returned: true}) {
      id
    }
  }
`

export const DELETE_RENT = gql`
  mutation ($id: Int!) {
    delete_rents_by_pk(id: $id) {
      id
    }
  }
`