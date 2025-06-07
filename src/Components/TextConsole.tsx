interface TextConsoleProps {
    log: string[];
    input: string;
    setInput: (input: string) => void;
    handleCommand: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
}

const TextConsole = ({log, input, setInput, handleCommand, inputRef}: TextConsoleProps) => {
    return (
        <section className="w-full max-w-2xl p-0 bg-gray-800 text-white">
          <div
            className="p-2 h-34 overflow-y-auto"
            onFocus={() => {
              inputRef.current?.focus();
            }}
            ref={(el) => {
              if (el) el.scrollTop = el.scrollHeight;
            }}
          >
            {log.slice(-5).map((line, idx) => (
              <div key={idx}>
                {line.split("\n").map((part, partIdx) => (
                  <div key={partIdx}>{part}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-row w-full bg-gray-900 text-white p-2">
            <div className="mr-2 animate-[flash_1s_ease-in-out_infinite]">
              {">"}
            </div>
            <input
              ref={inputRef}
              type="text"
              className="w-full focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand()}
            />
          </div>
        </section>
    )
}

export default TextConsole;