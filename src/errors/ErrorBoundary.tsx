import { Button, Card } from "antd";
import { FC } from "react";
import { useRouteError } from "react-router-dom";

const ErrorBoundary: FC<{}> = ({}) => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-boundary-wrapper">
      <Card className="error-card">
        <h3 className="mt-4">Something went wrong</h3>
        <h6>Please check your connection</h6>
        <Button type="primary" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </Card>
    </div>
  );
};

export default ErrorBoundary;
