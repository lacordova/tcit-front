import React from 'react'
import { useEffect, useState } from 'react'
import { useGetPostsQuery, useDeletePostMutation, apiSlice } from '../api/apiSlice'
import { store } from '../store'
import { Table, Form, InputGroup } from 'react-bootstrap'
import { current } from '@reduxjs/toolkit'


function PostsList() {
  const { data: posts, isLoading } = useGetPostsQuery()
  const [deletePost, result] = useDeletePostMutation()
  const [search, setSearch] = useState('')
  const dispatch = store.dispatch


  const handleClick = (id) => () => {
    deletePost(id)
  }

  useEffect(() => {
    result.data && dispatch(
      apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
        const index = current(draft).map(post => post.id).indexOf(result.data.id)
        draft.splice(index,1)
      })
    )
  }, [result.data, dispatch])

  return (
    <>
      <Form>
        <InputGroup className="my-3">
          <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder={'Filtro de Nombre'}/>
        </InputGroup>
      </Form>
      {!isLoading && 
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {posts.filter(post => {
            return search.toLowerCase() === '' ? post : post.name.toLowerCase().includes(search)
          }).map(post => (
            <tr key={post.id}>
              <td>{post.name}</td>
              <td>{post.description}</td>
              <td>
                <button onClick={handleClick(post.id)}>
                Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>}
    </>
  )}

export default PostsList
