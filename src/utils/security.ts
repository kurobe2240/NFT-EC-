import DOMPurify from 'dompurify';
import validator from 'validator';

export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'title', 'target']
  });
};

export const escapeString = (str: string): string => {
  return validator.escape(str);
};

export const validateInput = {
  // NFTタイトルのバリデーション
  title: (title: string): boolean => {
    return validator.isLength(title, { min: 1, max: 100 }) && 
           validator.matches(title, /^[a-zA-Z0-9\s\-_\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]+$/);
  },

  // 価格のバリデーション
  price: (price: number): boolean => {
    return validator.isFloat(price.toString(), { min: 0, max: 1000000 });
  },

  // ウォレットアドレスのバリデーション
  walletAddress: (address: string): boolean => {
    return validator.matches(address, /^0x[a-fA-F0-9]{40}$/);
  },

  // URLのバリデーション
  url: (url: string): boolean => {
    return validator.isURL(url, {
      protocols: ['http', 'https'],
      require_protocol: true
    });
  }
}; 