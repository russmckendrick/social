import { lazy, type ComponentType } from 'react';

// Dynamic icon loader that maps icon names to their imports
export const loadIcon = (iconName: string): ComponentType<any> => {
  // FontAwesome 6 icons
  if (iconName.startsWith('Fa')) {
    return lazy(async () => {
      try {
        const module = await import('react-icons/fa6');
        const IconComponent = (module as any)[iconName];
        if (!IconComponent) {
          console.warn(`Icon ${iconName} not found in FontAwesome 6, using fallback`);
          return { default: module.FaLink };
        }
        return { default: IconComponent };
      } catch (error) {
        console.warn(`Failed to load FontAwesome icon ${iconName}:`, error);
        const fallbackModule = await import('react-icons/fa6');
        return { default: fallbackModule.FaLink };
      }
    });
  }
  
  // Simple Icons
  if (iconName.startsWith('Si')) {
    return lazy(async () => {
      try {
        const module = await import('react-icons/si');
        const IconComponent = (module as any)[iconName];
        if (!IconComponent) {
          console.warn(`Icon ${iconName} not found in Simple Icons, using fallback`);
          const fallbackModule = await import('react-icons/fa6');
          return { default: fallbackModule.FaLink };
        }
        return { default: IconComponent };
      } catch (error) {
        console.warn(`Failed to load Simple icon ${iconName}:`, error);
        const fallbackModule = await import('react-icons/fa6');
        return { default: fallbackModule.FaLink };
      }
    });
  }
  
  // Material Design icons
  if (iconName.startsWith('Md')) {
    return lazy(async () => {
      try {
        const module = await import('react-icons/md');
        const IconComponent = (module as any)[iconName];
        if (!IconComponent) {
          console.warn(`Icon ${iconName} not found in Material Design, using fallback`);
          const fallbackModule = await import('react-icons/fa6');
          return { default: fallbackModule.FaLink };
        }
        return { default: IconComponent };
      } catch (error) {
        console.warn(`Failed to load Material Design icon ${iconName}:`, error);
        const fallbackModule = await import('react-icons/fa6');
        return { default: fallbackModule.FaLink };
      }
    });
  }
  
  // Tabler Icons
  if (iconName.startsWith('Tb')) {
    return lazy(async () => {
      try {
        const module = await import('react-icons/tb');
        const IconComponent = (module as any)[iconName];
        if (!IconComponent) {
          console.warn(`Icon ${iconName} not found in Tabler Icons, using fallback`);
          const fallbackModule = await import('react-icons/fa6');
          return { default: fallbackModule.FaLink };
        }
        return { default: IconComponent };
      } catch (error) {
        console.warn(`Failed to load Tabler icon ${iconName}:`, error);
        const fallbackModule = await import('react-icons/fa6');
        return { default: fallbackModule.FaLink };
      }
    });
  }
  
  // Remix Icons
  if (iconName.startsWith('Ri')) {
    return lazy(async () => {
      try {
        const module = await import('react-icons/ri');
        const IconComponent = (module as any)[iconName];
        if (!IconComponent) {
          console.warn(`Icon ${iconName} not found in Remix Icons, using fallback`);
          const fallbackModule = await import('react-icons/fa6');
          return { default: fallbackModule.FaLink };
        }
        return { default: IconComponent };
      } catch (error) {
        console.warn(`Failed to load Remix icon ${iconName}:`, error);
        const fallbackModule = await import('react-icons/fa6');
        return { default: fallbackModule.FaLink };
      }
    });
  }
  
  // Fallback for unknown prefixes
  console.warn(`Unknown icon prefix for ${iconName}, using fallback`);
  return lazy(async () => {
    const module = await import('react-icons/fa6');
    return { default: module.FaLink };
  });
};