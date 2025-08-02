import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './Dashboard';
import Jobs from './Jobs';
import Clients from './Clients';
import Inventory from './Inventory';
import Labor from './Labor';
import Reports from './Reports';
import ImportData from './ImportData';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/labor" element={<Labor />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/import" element={<ImportData />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;










