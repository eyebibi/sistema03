interface LLMResponse {
  categories: Array<{ name: string }>;
  channels: Array<{ category: string }>;
}

export function normalizeCategories(llmResponse: LLMResponse): void {
  llmResponse.categories = llmResponse.categories.map((category) => {
    const emojiPos = category.name.search(/\p{Emoji}+/gu);

    if (emojiPos === -1) return category;

    const charAtIndex = category.name.charAt(emojiPos + 2);
    if (charAtIndex && charAtIndex.charCodeAt(0).toString(16) === "fe0f") {
      const normalizedCategoryName =
        category.name.slice(0, emojiPos + 2) +
        category.name.slice(emojiPos + 3);

      category.name = normalizedCategoryName;
    }

    return category;
  });

  llmResponse.channels = llmResponse.channels.map((channel) => {
    const emojiPos = channel.category.search(/\p{Emoji}+/gu);

    if (emojiPos === -1) return channel;

    const charAtIndex = channel.category.charAt(emojiPos + 2);
    if (charAtIndex && charAtIndex.charCodeAt(0).toString(16) === "fe0f") {
      const normalizedCategoryName =
        channel.category.slice(0, emojiPos + 2) +
        channel.category.slice(emojiPos + 3);

      channel.category = normalizedCategoryName;
    }

    return channel;
  });
}
