import {
    Navigate,
    Outlet,
    useOutletContext,
    useParams,
  } from 'react-router-dom';
  import { Note } from '../../types';
  
  type LayoutProps = {
    notes: Note[];
  };
  
  const Layout = ({ notes }: LayoutProps) => {
    //get id from url
    const { id } = useParams();
  
    //find note
    const found = notes.find((n) => n.id == id);
  
    if (found) {
      return <Outlet context={found} />;
    } else {
      return <Navigate to="/" replace />;
    }
  };
  
 // function that provides access to the data we define as context that child routes can use
  export function useNote() {
    return useOutletContext<Note>();
  }
  
  export default Layout;