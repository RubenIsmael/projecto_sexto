interface TableInfo {
  name: string;
  columns: Array<{
    name: string;
    type: string;
    constraints: string[];
  }>;
}

export const parseSQLFile = (content: string): TableInfo[] => {
  const tables: TableInfo[] = [];
  const createTableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?\s*\(([\s\S]*?)\);/gi;
  
  let match;
  while ((match = createTableRegex.exec(content)) !== null) {
    const tableName = match[1];
    const columnsString = match[2];
    
    const columns = columnsString.split(',').map(col => {
      const parts = col.trim().split(/\s+/);
      const name = parts[0].replace(/[`"]/g, '');
      const type = parts[1];
      const constraints = parts.slice(2);
      
      return {
        name,
        type,
        constraints
      };
    });
    
    tables.push({
      name: tableName,
      columns
    });
  }
  
  return tables;
};