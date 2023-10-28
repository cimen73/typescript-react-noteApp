import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { useNote } from './Layout';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

type Props = {
  deleteNote: (id: string) => void;
};

const NoteDetail = ({ deleteNote }: Props) => {
  // access data from the container route
  const note = useNote();

  return (
    <>
      <Row>
        <Col>
          <h1>{note.title}</h1>

          {note.tags.length > 0 && (
            <Stack direction="horizontal">
              {note.tags.map((tag) => (
                <Badge>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs={'auto'}>
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button variant="outline-primary">Edit</Button>
            </Link>

            <Button
              onClick={() => deleteNote(note.id)}
              variant="outline-danger"
            >
            Delete
            </Button>

            <Link to={'/'}>
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
};

export default NoteDetail;