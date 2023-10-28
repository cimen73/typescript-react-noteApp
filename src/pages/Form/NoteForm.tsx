import { FormEvent, useRef, useState } from 'react';
import { Col, Row, Stack, Form, Button } from 'react-bootstrap';
import ReactSelect from 'react-select/creatable';
import { NewNoteProps } from './NewNote';
import { NoteData,Tag } from '../../types';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const NoteForm = ({
  onSubmit,
  createTag,
  availableTags,
  title = '',
  markdown = '',
  tags = [],
}: NewNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

 // If you want to ignore warnings that the value we want to use may be null, in javascript? Similar to ! we use.
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate(-1);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                defaultValue={title}
                ref={titleRef}
                className="shadow"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                className="shadow"
                //determine what was previously selected
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                // transfers the selected items to state
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  )
                }
               //create new tag
                onCreateOption={(label) => {
                  const newTag: Tag = { id: v4(), label };
                  createTag(newTag);
                  setSelectedTags([...selectedTags, newTag]);
                }}
                // options
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* text content */}
        <Form.Group>
          <Form.Label>Contents</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            as={'textarea'}
            rows={15}
            required
            className="shadow"
          />
        </Form.Group>
        {/* buttons */}
        <Stack direction="horizontal">
          <Button type="submit">Save</Button>
          <Button
            onClick={() => navigate(-1)}
            type="button"
            variant="secondary"
          >
           Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;