import React from 'react'
import { useEffect } from 'react'
import { useCreatePostMutation, apiSlice } from '../api/apiSlice'
import { store } from '../store'
import { Col, Row, Form, Button } from 'react-bootstrap'


const PostForm = () => {

  const dispatch = store.dispatch
  const [createPost, result] = useCreatePostMutation()


  const handleSubmit = (e) => {
    e.preventDefault()
    
    const name = e.target.elements.name.value.trim()
    const description = e.target.elements.description.value.trim()
    
    createPost({
      name,
      description
    })
    e.target.reset()
  }

  useEffect(() => {
    result.data && dispatch(
      apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
        draft.push(result.data)
      })
    )
  }, [result.data, dispatch])

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Form.Group as={Col} controlId='name' >
          <Form.Control type='text' placeholder="Nombre"/>
        </Form.Group>
        <Form.Group as={Col} controlId='description' >
          <Form.Control type='text' placeholder="Descripción"/>
        </Form.Group>
          
        <Form.Group as={Col} className='text-center'>
          <Button type="submit">
            Crear
          </Button>
        </Form.Group>
      </Row>
    </Form>
  )
}

export default PostForm
