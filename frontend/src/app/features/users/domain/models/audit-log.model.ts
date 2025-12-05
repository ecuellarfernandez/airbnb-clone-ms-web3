export interface AuditLog {
    id: number;
    user_id: number | null;
    action: string; 
    description: string;
    entity_name: string;
    entity_id: number | null;
    action_timestamp: string;
    ip_address: string | null;
    new_value: string | null; 
    old_value: string | null;

}

// Interfaz específica para la respuesta de Django (difiere de la de Spring)
export interface AdminPagedResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    total_items: number;
    total_pages: number;
    current_page: number;
}

// por si el backend trae el filtrado 
export interface AuditLogFilters {
    search?: string;
    action?: string;
    entity?: string;
    dateFrom?: string;
    dateTo?: string;
}