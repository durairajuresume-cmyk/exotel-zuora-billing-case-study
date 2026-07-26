import { Routes, Route, Navigate } from 'react-router-dom';
import { TopNav } from './components/TopNav';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';
import { Slides } from './pages/Slides';
import { PrototypeLayout } from './pages/prototype/PrototypeLayout';
import { DemoControlCenter } from './pages/prototype/DemoControlCenter';
import { BillingOpsDashboard } from './pages/prototype/BillingOpsDashboard';
import { BatchList } from './pages/prototype/BatchList';
import { BatchDetail } from './pages/prototype/BatchDetail';
import { Traceability } from './pages/prototype/Traceability';
import { Exceptions } from './pages/prototype/Exceptions';
import { ExceptionDetail } from './pages/prototype/ExceptionDetail';
import { CustomerBilling } from './pages/prototype/CustomerBilling';
import { IntegrationHealth } from './pages/prototype/IntegrationHealth';

function App() {
  return (
    <div className="min-h-screen bg-bg">
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study" element={<CaseStudy />} />
        <Route path="/slides" element={<Slides />} />
        <Route path="/prototype" element={<PrototypeLayout />}>
          <Route index element={<Navigate to="demo" replace />} />
          <Route path="demo" element={<DemoControlCenter />} />
          <Route path="dashboard" element={<BillingOpsDashboard />} />
          <Route path="batches" element={<BatchList />} />
          <Route path="batches/:id" element={<BatchDetail />} />
          <Route path="traceability" element={<Traceability />} />
          <Route path="exceptions" element={<Exceptions />} />
          <Route path="exceptions/:exceptionId" element={<ExceptionDetail />} />
          <Route path="customers" element={<CustomerBilling />} />
          <Route path="health" element={<IntegrationHealth />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
