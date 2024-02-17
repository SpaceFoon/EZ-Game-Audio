/**
 * OutputFormatComponent.tsx
 * Renders a single output format option in the output format menu.
 * @param label - The text displayed next to the checkbox.
 * @param value - The value of the output format, used as the checkbox's `id` and to identify the selected format.
 * @param checked - Whether the checkbox is checked or not.
 * @param onChange - A function that is called when the checkbox is changed. The value of the changed format is passed to the function.
 */

import propTypes from 'prop-types';
interface Props {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}
const OutputFormatComponent: React.FC<Props> = ({ label, value, checked, onChange }) => (
  <label htmlFor={value}>
    <input
      id={`${value}`}
      type="checkbox"
      name="outputType"
      value={value}
      checked={checked}
      onChange={() => onChange(value)}
    />
    {label}
  </label>
);
OutputFormatComponent.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  checked: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
}
export default OutputFormatComponent;
