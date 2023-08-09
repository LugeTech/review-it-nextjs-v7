// 'use client'

const DispayError = ({ error }: { error: string | null }) => {
  // const [displayError, setDisplayError] = useState<string | null>(error);


  return (
    <div className='text-red-300 text-sm font-bold'>
      {error}
    </div>
  );
};

export default DispayError;

