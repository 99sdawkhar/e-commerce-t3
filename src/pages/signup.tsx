import SignupForm from '@/component/SignupForm';
import { withAuth } from '@/hoc/withAuth';

const Signup = () => {
  return (
    <div className='flex justify-center mb-4'>
      <SignupForm />
    </div>
  );
};

export default withAuth(Signup);