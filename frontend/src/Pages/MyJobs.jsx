import React, { useEffect, useState } from "react";

export const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3000/myJobs/mdalmamunit427@gmail.com")
            .then((res) => res.json())
            .then((data) => {
                setJobs(data);
                setIsLoading(false);
            });
    }, []);

    const handleSearch = () => {
        const filter = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
        setJobs(filter);
        setIsLoading(false);
    };

    const handleDelete = (id)=>{
        fetch(`http://localhost:3000/job/${id}`,{
            method:"DELETE"
        }).then(res => res.json).then(data=>{
            if(data.acknowledged===true){
                alert("Job Deleted Successfully");
            }
        });
    };

    return <div className="max-w-screen-2x1 container mx-auto x1:px-24 px-4">
        <div className="my-jobs-container">
            <h1 className="text-center p-4">ALL My Jobs</h1>
            <div className="search-box p-2 text-center mb-2">
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text" name="search" id="search" className="py-2 p1-3 border focus:outline-none 1g:w-6/12 mb-4 w-full" />
                <button className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4" onClick={handleSearch}>Search</button>
            </div>
        </div>

        {/* table  */}

        <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        No.
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Title
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Company Name
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Salary
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Edit
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Delete
                                    </th>
                                </tr>
                            </thead>

                            {
                                isLoading ? (<div className="flex items-center justify-center h-20"><p>loading...</p></div>) : (
                                    <tbody>
                                    {
                                        jobs.map((job,index)=>(
                                            <tr key={index}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                {index+1}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {job.jobTitle}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {job.companyName}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                ${job.minPrice} - ${job.maxPrice}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                <button><Link to={`/edit-job/${job?._id}`}Edit></Link></button>
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                <button onClick={()=> handleDelete(job._id)} className="bg-red-700 py-2 px-6 text-white rounded-sm">Delete</button>
                                            </td>
                                        </tr>
                                        ))
                                    }
                                 
                                </tbody>
                                )
                            }

                           

                        </table>
                    </div>
                </div>
            </div>
            <footer className="relative pt-8 pb-6 mt-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                            {/* <div className="text-sm text-blueGray-500 font-semibold py-1">
                                Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                            </div> */}
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    </div>;
};

//export default MyJobs;