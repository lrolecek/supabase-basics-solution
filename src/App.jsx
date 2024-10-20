import {useEffect, useState} from 'react'

import {supabase} from './Supabase'

function App() {

  const [products, setProducts] = useState(null)

  useEffect(
    () => {
      getProducts()
    },
    []
  )

  // Nacteni seznamu produktu
  // SELECT
  const getProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select()

    if (error !== null) {
      console.log(error.message)
      return
    }

    setProducts(data)
  }

  // Pridani produktu
  // INSERT
  const addNewProduct = async () => {
    const { error } = await supabase
      .from('products')
      .insert({
        name: 'Kokos',
        description: 'Hneda kulata a chlupata vec',
        price: 57.4
      })

    if (error !== null) {
      console.log(error.message)
      return
    }

    getProducts()
  }

  // Aktualizace existujiciho produktu
  // UPDATE
  const updateProduct = async () => {
    const { error } = await supabase
      .from('products')
      .update({
        name: 'Meloun',
        description: 'Zelena pruhovana vec s cervenym vnitrkem',
        price: 136
      })
      .eq('id', 7)

    if (error !== null) {
      console.log(error.message)
      return
    }

    getProducts()
  }

  // Smazani produktu
  const deleteProduct = async () => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', 7)

    if (error !== null) {
      console.log(error.message)
      return
    }

    getProducts()
  }


  return (
    <>
      <h1>Supabase</h1>

      <button onClick={addNewProduct}>Pridat</button>
      <button onClick={updateProduct}>Upravit</button>
      <button onClick={deleteProduct}>Smazat</button>

      {
        products === null
        ? <p>Načítám data...</p>
        : <ul>
            {products.map(product => (
              <li key={product.id}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p><strong>{product.price} Kč</strong></p>
              </li>
            ))}
          </ul>
      }

    </>
  )
}

export default App
