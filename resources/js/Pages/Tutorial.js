import Main from "@/Components/TokoTemplate/Main";
import { Head } from "@inertiajs/react";

const Tutorial = ({ title }) => {
  return (
    <>
      <Head title={title} />
      <h1 className="text-md md:text-2xl">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <h1 className="text-center text-2xl my-4">Tutorial lengkapnya di Youtube <a className="text-red-500" href="https://youtube.com/@SoftDevId">@SoftDevID</a></h1>
      </div>
    </>
  )
}

Tutorial.layout = (page) => <Main children={page} />
export default Tutorial;
