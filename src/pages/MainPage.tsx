import {
    Button,
    Col,
    Row,
    Stack,
    Form,
    Card,
    Badge,
  } from 'react-bootstrap';
  import { Note, Tag } from '../types';
  import { Link } from 'react-router-dom';
  import ReactSelect from 'react-select';
  import { useMemo, useState } from 'react';
  import styles from './mainpage.module.css';
  import Navbar from 'react-bootstrap/Navbar';
  import Container from 'react-bootstrap/Container';
 
  import Figure from 'react-bootstrap/Figure';
  type MainProps = {
    notes: Note[];
    availableTags: Tag[];
  };
  const MainPage = ({ notes, availableTags }: MainProps) => {
    const [title, setTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  
    const filtredNotes = useMemo(() => {
      return notes.filter((note) => {
        return (
         // If the note's title contains the search text, return related titles
          (title === '' ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          // if no tag is selected or one of the note's tags matches one of the selected tags, returns the tag.
           // every runs some(): for each selected tag > checks if at least one of the note's tags matches the selected tags
          (selectedTags.length == 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => noteTag.id === tag.id)
            ))
        );
      });
    }, [title, selectedTags, notes]);
  
    return (

      
      <>
      <Navbar expand="lg"  className="bg-white m-1 rounded" >
      <Container>
      <Figure>
      <Figure.Image
      className='m-1 '
        width={45}
        height={45}
        
        src="src/indirr.png"
      /></Figure>
    

        <Navbar.Brand   href="#" className=' fw-bold fs-1  ' >My Notes</Navbar.Brand>
      </Container>
    </Navbar>
      
        {/* header */}
        <Stack
          direction="horizontal"
          className="justify-content-between mb-3"
        >
          <h1>Notes</h1>
  
          <Link to={'/new'}>
            <Button variant="outline-success" size="lg" className='m-2 p-2'>Create</Button>
          </Link>
        </Stack>
  
        {/* filter */}
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Search by title</Form.Label>
                <Form.Control
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Search by tag</Form.Label>
                <ReactSelect
                  isMulti
                  className="shadow"
                  // identify previously selected
                  value={selectedTags.map((tag) => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  //Transfers the selected items to state
                  onChange={(tags) =>
                    setSelectedTags(
                      tags.map((tag) => ({
                        label: tag.label,
                        id: tag.value,
                      }))
                    )
                  }
                  // options
                  options={availableTags.map((tag) => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
  
        {/* notes */}
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
          {filtredNotes.map((note) => (
            <Col key={note.id}>
              <NoteCard
                id={note.id}
                tags={note.tags}
                title={note.title}
              />
            </Col>
          ))}
        </Row>
      </>
    );
  };
  
  export default MainPage;
  
  type CardType = {
    id: string;
    title: string;
    tags: Tag[];
  };
  
  function NoteCard({ id, title, tags }: CardType) {
    return (
      <Card as={Link} to={`/${id}`} className={styles.card}>
        <Card.Body  className='bg-success'>
          <Stack
            className="align-items-center justify-content-between h-100"
            gap={2}
          >
            <span>{title}</span>
  
            {tags.length > 0 && (
              <Stack
                direction="horizontal"
                className="justify-content-center flex-wrap "
              >
                {tags.map((tag) => (
                  <Badge>{tag.label}</Badge>
                ))}
              </Stack>
            )}
          </Stack>
        </Card.Body>
      </Card>
    );
  }