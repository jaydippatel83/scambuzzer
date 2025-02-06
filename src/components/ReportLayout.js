import SidebarComponent from './SidebarComponent';

const ReportLayout = ({ children }) => {
  return (
    <div className="flex bg-background text-foreground">
       <SidebarComponent label="report" />
       <div className="flex-1 p-6 mt-10">{children}</div>
    </div>
  );
    };

export default ReportLayout;