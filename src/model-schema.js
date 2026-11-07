// Zero means unknown. Limits protect the inspector, not a claim about model architectures.
export const STRUCTURE_LIMITS = {layers:4096, heads:4096, kvHeads:4096, experts:4096, activeExperts:4096, hidden:1000000, ffn:100000000, context:1000000000, vocab:10000000};

export function getLayerIndex(name) {
 const match = name.match(/(?:^|\.)(?:blk|layers|h|blocks)\.(\d+)\./);
 return match ? Number(match[1]) : null;
}

export function validateModelStructure(model) {
 for (const [key, max] of Object.entries(STRUCTURE_LIMITS)) {
  const value = model[key];
  if (!Number.isSafeInteger(value) || value < 0 || value > max) {
   throw new Error(`Некорректный параметр ${key}: ожидается целое число от 0 до ${max}`);
  }
 }
 if (model.heads && model.kvHeads > model.heads) throw new Error('Число KV-голов превышает число Q-голов');
 if (model.experts && model.activeExperts > model.experts) throw new Error('Число активных экспертов превышает общее число экспертов');
 return model;
}
