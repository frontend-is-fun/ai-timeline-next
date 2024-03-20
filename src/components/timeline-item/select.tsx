/* eslint-disable no-unused-vars */

'use client';

interface SelectorProps {
  value: string;
  onSelect: (value: string) => Promise<void>;
}

const templates: string[] = ['tree1', 'tree2'];

const Selector = (props: SelectorProps) => {
  const { value, onSelect } = props;
  return (
    <select
      className='select select-bordered w-full max-w-xs'
      value={value}
      onChange={async (e) => {
        onSelect(e.target.value);
      }}
    >
      <option
        disabled
        selected
      >choose a template
      </option>
      {
        templates.map((template) => (
          <option
            key={template}
            value={template}
          >{template}
          </option>
        ))
      }
    </select>
  );
};
export default Selector;
