export function Keyboard({ onKeyPress }) {
  return (
    <div>
      <input
        id="KeyboardInput"
        placeholder="Keyboard"
        onChange={(e) => onKeyPress(e.target.value.slice(-1))}
      />
    </div>
  );
}
