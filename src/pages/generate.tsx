import Button from "@/component/Button";
import Loader from "@/component/Loader";
import { withAuth } from "@/hoc/withAuth";
import { api } from "@/utils/api";
import toast from "react-hot-toast";

const GenerateCategories = () => {
  const { isLoading } = api.user.getUserByToken.useQuery({});

  const creatUser = api.categoy.generateFakeCategories.useMutation({
    onSuccess: (data) => {
      toast.success(data.message ?? '')
    },
    onError: (error) => {
      toast.error(error.message ?? '')
    },
  });

  const registerUser = () => {
    const newUser = creatUser.mutate({});

    return newUser;
  };

  const handleGenerate = () => {
    registerUser();
  }

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <Button onClick={handleGenerate} type="button" name="Generate Categories" classes="max-w-[300px] mx-auto block" />
  );
};

export default withAuth(GenerateCategories);
