import CategoryList from "@/component/CategoryList";
import Input from "@/component/Input";
import Loader from "@/component/Loader";
import { withAuth } from "@/hoc/withAuth";
import { api } from "@/utils/api";
import { itemsPerPage } from "@/utils/constants";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const { data: user, isLoading } = api.user.getUserByToken.useQuery({});

  const { data: items = [] } = api.categoy.getCategories.useQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);


  const handlePageChange = (pageNumber: number | null) => {
    if (pageNumber) {
      if (pageNumber < 1) {
        pageNumber = 1;
      } else if (pageNumber > totalPages) {
        pageNumber = totalPages;
      }
      setCurrentPage(pageNumber);
    }
  };

  const renderPagination = () => {
    const lessThanCurrentPage = (number: number | null) =>
      number && number > 0 ? number : null;

    const greaterThanCurrentPage = (
      number: number | null,
      totalCount: number,
    ) => (number && number <= totalCount ? number : null);

    const buttonList = {
      firstPage: 1,
      prevPage: lessThanCurrentPage(currentPage - 1),
      lessPages: currentPage - 3 > 1,
      prevPage_3: lessThanCurrentPage(currentPage - 3),
      prevPage_2: lessThanCurrentPage(currentPage - 2),
      prevPage_1: lessThanCurrentPage(currentPage - 1),
      currentPage,
      nextPage_1: greaterThanCurrentPage(currentPage + 1, totalPages),
      nextPage_2: greaterThanCurrentPage(currentPage + 2, totalPages),
      nextPage_3: greaterThanCurrentPage(currentPage + 3, totalPages),
      morePages: currentPage + 3 < totalPages,
      nextPage: greaterThanCurrentPage(currentPage + 1, totalPages),
      lastPage: totalPages,
    };

    return (
      <div className="flex gap-2 text-[#ACACAC]">
        <button onClick={() => handlePageChange(buttonList.firstPage)}>
          {"<<"}
        </button>

        <button
          onClick={() => handlePageChange(buttonList.prevPage)}
          disabled={!buttonList.prevPage}
          className={`hover:text-slate-600 ${!buttonList.prevPage && 'disabled'}`}
        >
          {"<"}
        </button>

        <span>{buttonList.lessPages && "..."}</span>

        <button
          onClick={() => handlePageChange(buttonList.prevPage_3)}
          disabled={!buttonList.prevPage_3}
          className={`hover:text-slate-600 ${!buttonList.prevPage_3 && 'disabled'}`}
        >
          {buttonList.prevPage_3}
        </button>

        <button
          onClick={() => handlePageChange(buttonList.prevPage_2)}
          disabled={!buttonList.prevPage_2}
          className={`hover:text-slate-600 ${!buttonList.prevPage_2 && 'disabled'}`}
        >
          {buttonList.prevPage_2}
        </button>

        <button
          onClick={() => handlePageChange(buttonList.prevPage_1)}
          disabled={!buttonList.prevPage_1}
          className={`hover:text-slate-600 ${!buttonList.prevPage_1 && 'disabled'}`}
        >
          {buttonList.prevPage_1}
        </button>

        <button onClick={() => handlePageChange(currentPage)} className="text-black">
          <strong>{currentPage}</strong>
        </button>

        <button
          onClick={() => handlePageChange(buttonList.nextPage_1)}
          disabled={!buttonList.nextPage_1}
          className={`hover:text-slate-600 ${!buttonList.nextPage_1 && 'disabled'}`}
        >
          {buttonList.nextPage_1}
        </button>

        <button
          onClick={() => handlePageChange(buttonList.nextPage_2)}
          disabled={!buttonList.nextPage_2}
          className={`hover:text-slate-600 ${!buttonList.nextPage_2 && 'disabled'}`}
        >
          {buttonList.nextPage_2}
        </button>

        <button
          onClick={() => handlePageChange(buttonList.nextPage_3)}
          disabled={!buttonList.nextPage_3}
          className={`hover:text-slate-600 ${!buttonList.nextPage_3 && 'disabled'}`}
        >
          {buttonList.nextPage_3}
        </button>

        <span>{buttonList.morePages && "..."}</span>

        <button
          onClick={() => handlePageChange(buttonList.nextPage)}
          disabled={!buttonList.nextPage}
          className={`hover:text-slate-600 ${!buttonList.nextPage && 'disabled'}`}
        >
          {">"}
        </button>

        <button onClick={() => handlePageChange(buttonList.lastPage)}>
          {">>"}
        </button>
      </div>
    );
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="mb-4 flex justify-center">
      <div className="flex w-[90%] lg:w-1/3 flex-col justify-center rounded-2xl border border-[#C1C1C1] p-10">
        <h2 className="mb-8 text-center text-2xl font-semibold">
          Please mark your interests!
        </h2>
        <h3 className="mb-3 text-center">We will keep you notified.</h3>
        <p className="mb-2 text-xl font-medium">My saved interests!</p>
        <CategoryList currentPage={currentPage} items={items} user={user} />
        {renderPagination()}
      </div>
    </div>
  );
};

export default withAuth(Home);
