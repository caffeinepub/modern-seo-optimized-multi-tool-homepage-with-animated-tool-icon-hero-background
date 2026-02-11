export interface ToolMetadata {
  id: string;
  name: string;
  path: string;
  category: 'pdf' | 'image' | 'calculator' | 'utility';
}

export const toolsRegistry: ToolMetadata[] = [
  {
    id: 'pdf-to-word',
    name: 'PDF to Word Online Free',
    path: '/tools/pdf-to-word-online-free',
    category: 'pdf',
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor Online Free',
    path: '/tools/image-compressor-online-free',
    category: 'image',
  },
];

export function getRelatedTools(currentToolPath: string, maxResults: number = 3): ToolMetadata[] {
  const currentTool = toolsRegistry.find(tool => tool.path === currentToolPath);
  
  if (!currentTool) {
    return [];
  }

  // Find tools in the same category, excluding the current tool
  const relatedTools = toolsRegistry.filter(
    tool => tool.category === currentTool.category && tool.path !== currentToolPath
  );

  return relatedTools.slice(0, maxResults);
}

export function getToolByPath(path: string): ToolMetadata | undefined {
  return toolsRegistry.find(tool => tool.path === path);
}
