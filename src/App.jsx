import {useEffect, useState} from 'react'

import {supabase} from './supabase'

function App() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const {data, error} = await supabase
    .from('products')
    .select()
    .order('id', {ascending: true})
    // .lte('price', 10000)
    // .eq('name', 'Vysavač')

    if (error) {
      console.log(error)
      return
    }

    setProducts(data)
  }

  const addProduct = async (name, description, price) => {
    const {error} = await supabase
    .from('products')
    .insert({
      name,
      description,
      price,
    })

    if (error) {
      console.log(error)
      return
    }

    getProducts()
  }

  const updateProduct = async (id, name) => {

    const {error} = await supabase
    .from('products')
    .update({
      name,
    })
    .eq('id', id)

    if (error) {
      console.log(error)
      return
    }

    getProducts()
  }

  const deleteProduct = async (id) => {

    const {error} = await supabase
    .from('products')
    .delete()
    .eq('id', id)

    if (error) {
      console.log(error)
      return
    }

    getProducts()
  }

  return (
    <>
      <h1>Supabase</h1>

      <button onClick={() => { addProduct('Myčka', 'Myje nádobí', 11350) }}>Přidat myčku</button>

      {
        products === null
        ? <p>Načítám data...</p>
        : <table border="1">
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td><strong>{product.price} Kč</strong></td>
                  <td>
                    <button onClick={() => {updateProduct(product.id, 'Fén')}}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => {deleteProduct(product.id)}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      }
    </>
  )
}

export default App
