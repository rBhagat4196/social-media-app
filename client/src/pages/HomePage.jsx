import { useSelector } from "react-redux"

const HomePage = () => {
  const {theme} = useSelector((state)=>state.theme);
  console.log(theme);
  return (
    <div>
        Home Page      
    </div>
  )
}

export default HomePage
