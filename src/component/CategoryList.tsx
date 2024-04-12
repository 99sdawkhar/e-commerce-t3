import { api } from "@/utils/api";
import toast from "react-hot-toast";
import Input from "./Input";
import { itemsPerPage } from "@/utils/constants";

interface ICategoryList { 
    currentPage: any
    items: any
    user: any
}

const CategoryList = ({ currentPage, items, user }: ICategoryList) => {
    const utils = api.useContext();
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const updateCategoryList = api.user.toggleCategory.useMutation({
      onError: (error) => {
        toast.error(error?.message ?? '', {
          id: 'error'
        })
      },
      onSuccess: (data) => {
        toast.success(data?.message ?? '', {
          id: 'success'
        })
        utils.user.getUserByToken.invalidate();
      },
    });
  
    const handleCategoryUpdate = (categoryId: string) => {
        updateCategoryList.mutate({
          categoryId,
        });
    };
  
    const handleChange = (categoryId: string) => {
      handleCategoryUpdate(categoryId);
    };
  
    return items.length > 0 ? items.slice(startIndex, endIndex).map((item: any) => (
      <div key={item.id}>
        <Input
          rightLabel={item.name}
          type="checkbox"
          name={item.name}
          checked={
            user?.Categories &&
            user?.Categories.find((category: any) => category.id === item?.id)
              ? true
              : false
          }
          handleChange={() => handleChange(item.id)}
          placeholder="Enter"
          parentClass="flex-row items-center"
          classes="w-4 h-4 text-black-600 bg-gray-100 border-gray-300 rounded focus:ring-black-500 dark:focus:ring-black-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2"
        />
      </div>
    )): (
      <div>No categories present at the moment.</div>
    );
  };

  export default CategoryList