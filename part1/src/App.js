const Hello = () => {
  return (
    <div>
      <p>Hello World</p>
    </div>
  )
}


const App = () => (
  <div>
    <p>Hello world</p>
    <Hello />
  </div>
)

export default App