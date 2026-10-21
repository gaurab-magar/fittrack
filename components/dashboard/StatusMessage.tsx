type StatusMessageProps = {
  type: "success" | "error";
  message: string;
};

export function StatusMessage({ type, message }: StatusMessageProps) {
  const styles =
    type === "success"
      ? "border-accent/30 bg-accent/10 text-accent"
      : "border-danger/30 bg-danger/10 text-danger";

  return (
    <p
      role="status"
      aria-live="polite"
      className={`rounded-xl border px-4 py-3 text-sm ${styles}`}
    >
      {message}
    </p>
  );
}
