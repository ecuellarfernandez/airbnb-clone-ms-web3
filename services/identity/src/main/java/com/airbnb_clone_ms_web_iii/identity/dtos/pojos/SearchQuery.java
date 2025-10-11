package com.airbnb_clone_ms_web_iii.identity.dtos.pojos;

public class SearchQuery {
    public String searchTerm;
    public int page;
    public int pageSize;

    public SearchQuery() {
    }

    public SearchQuery(String searchTerm, int page, int pageSize) {
        this.searchTerm = searchTerm;
        this.page = page;
        this.pageSize = pageSize;
    }

}
