import { FormEvent } from "react";

function createChangeProcessor(setter: ((value: React.SetStateAction<string>) => void) | ((value: string) => void)) {
  return (e: FormEvent) => {
    setter((e.target as HTMLInputElement).value);
  };
}

export default createChangeProcessor;
