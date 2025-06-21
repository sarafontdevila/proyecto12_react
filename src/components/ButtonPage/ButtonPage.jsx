import "./ButtonPage.css";

const ButtonPage = ({ page, setPage, totalPages}) => {
  return (
    <div className="buttonPage">
    <button onClick = {()=> page > 1 && setPage(page -1)}>Anterior</button>
    <p>{page}</p>
    <button onClick= {() => page < totalPages && setPage(page +1)}>Siguiente</button>
  </div>
  )
}

export default ButtonPage