import { Link } from 'react-router'
import Navbar from '../components/navbar'
import { Button } from '../components/ui/button'
import { useEffect } from 'react'
import useAppDispatch from '@/components/hooks/use-app-dispatch';
import { getUserData } from '@/store/auth';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';

function Home() {

  const appDispatch = useAppDispatch();

  useEffect(() => {
    const main = async () => {
      appDispatch(getUserData());
    }
    // const refreshToken = async () => {
    //   try {
    //     await axios.get(`${Config.backend_url}/auth/refresh`, {
    //       withCredentials: true
    //     });
    //     alert("Positive on refresh request");
    //   }
    //   catch (err) {
    //     if (err instanceof AxiosError) {
    //       alert("Negative on refresh request");
    //     }
    //   }
    // }
    // const logout = async () => {
    //   const req = await axios.get(`${Config.backend_url}/auth/signout`, {
    //     withCredentials: true
    //   });
    //   if (req.status == 200) {
    //     alert("Positive on logout request. rechecking req");
    //     await main();
    //   }
    // }
    main();
  }, []);

  return (
    <>
      <Navbar />
      <AppSidebar />
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center">
        <Button size="lg" className='m-5' asChild>
          <Link to="/generate">Generate Email</Link>
        </Button>
      </div>
    </>
  )
}

export default Home
