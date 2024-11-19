import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Salva um item no localStorage.
   * @param key A chave para identificar o item.
   * @param value O valor a ser armazenado (string ou objeto).
   */
  setItem(key: string, value: any): void {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  /**
   * Obtém um item do localStorage.
   * @param key A chave do item a ser recuperado.
   * @returns O valor armazenado ou `null` se não existir.
   */
  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data) as T;
      } catch {
        return data as unknown as T; // Retorna como string caso não seja JSON
      }
    }
    return null;
  }

  /**
   * Remove um item do localStorage.
   * @param key A chave do item a ser removido.
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Limpa todo o localStorage.
   */
  clear(): void {
    localStorage.clear();
  }
}
