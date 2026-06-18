export interface AgentResult<TOutput> {
  output: TOutput;
  totalTokens: number;
}

export interface Agent<TInput, TOutput> {
  execute(input: TInput): Promise<AgentResult<TOutput>>;
}
