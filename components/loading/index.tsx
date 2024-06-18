import { Progress } from '@/components/ui/progress';

type percentage = number;

const ProgressLoading = ({ pr = 100 }: { pr: percentage }) => {
  return <Progress value={pr} />;
};
export default ProgressLoading;
