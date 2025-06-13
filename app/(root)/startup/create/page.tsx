import StartupForm from '@/components/StartupForm'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

const CreateNewStartup = async () => {
    const session = await auth();
    console.log("Session:", session);

    if(!session) redirect('/');
  return (
    <>
     <section className='pink_container !min-h-[230px] font-[family-name:var(--font-work-sans)]'>
        <h1 className='heading'>Submit Your Startup Pitch</h1>
       
     </section>  
     <StartupForm />
    </>
  )
}

export default CreateNewStartup
