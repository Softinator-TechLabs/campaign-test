import { Progress } from '@/components/ui/progress';

type percentage = number;

const ProgressLoading = ({ pr = 100 }: { pr: percentage }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Progress value={pr} className="w-1/2 h-2 bg-gray-300" />
    </div>
  );
};
export default ProgressLoading;
