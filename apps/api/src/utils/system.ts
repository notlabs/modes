import si from 'systeminformation';

export const getDiskStats = async () => {
  const fsSize = await si.fsSize();
  const rootFs = fsSize.find(fs => fs.mount === '/');
  
  if (!rootFs) {
    return null;
  }

  return {
    mount: rootFs.mount,
    total: rootFs.size,
    used: rootFs.used,
    available: rootFs.available,
    usedPercent: rootFs.use
  };
}
