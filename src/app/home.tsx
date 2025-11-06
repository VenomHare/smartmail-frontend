import { Link } from 'react-router'
import Navbar from '../components/navbar'
import { Button } from '../components/ui/button'

function Home() {

  return (
    <>
      <Navbar />
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center">
        <Button size="lg" className='m-5' asChild>
          <Link to="/generate">Generate Email</Link>
        </Button>
      </div>
    </>
  )
}

export default Home
