type ToggleButtonProps = {
  pressed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

function ToggleButton({ pressed, onToggle, children }: ToggleButtonProps) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={Boolean(pressed)}
        onChange={onToggle}
        aria-label={typeof children === "string" ? children : undefined}
      />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleButton;
