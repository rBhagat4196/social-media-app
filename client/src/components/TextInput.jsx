/* eslint-disable react/prop-types */
const TextInput = ({
  type,
  placeholder,
  styles,
  label,
  labelStyles,
  value,
  onChange,
  error,
}) => {
  return (
    <div className='w-full flex flex-col mt-2'>
      {label && (
        <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
      )}

      <div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
          aria-invalid={error ? "true" : "false"}
        />
      </div>
      {error && (
        <span className='text-xs text-[#f64949fe] mt-0.5 '>{error}</span>
      )}
    </div>
  );
};

export default TextInput;
