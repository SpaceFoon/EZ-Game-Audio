/**
 * InputFormatCheckboxComponent.jsx
 * Renders a single input format checkbox.
 * @param label - The text displayed next to the checkbox.
 * @param value - The value of the checkbox.
 * @param checked - Whether the checkbox is checked.
 * @param onChange - A function that is called when the checkbox is changed.
 */
interface Props {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}
import propTypes from 'prop-types';
const  InputFormatCheckboxComponent: React.FC<Props> = ({ label, value, checked, onChange }) => (
  <label htmlFor={value}>
    <input
      id={`i${value}`}
      type="checkbox"
      name="inputType"
      value={value}
      checked={checked}
      onChange={() => onChange(value)}
    />
    {label}
  </label>
);
InputFormatCheckboxComponent.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  checked: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
}
export default InputFormatCheckboxComponent;
