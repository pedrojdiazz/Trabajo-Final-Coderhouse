import { normalizeString } from "../utils.js";

export class ProductDTO {

    constructor({ title, description, price, productCode, stock, category, thumbnails }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = productCode;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
        this.normalizedCategory = normalizeString(category);

    }
}

export class ProductQueryDTO {

    constructor({ sort, query, minPrice, maxPrice }) {
        this.query = query || '';
        this.sort = sort || 'asc';
        this.minPrice = parseFloat(minPrice) || null;
        this.maxPrice = parseFloat(maxPrice) || null;
    }

    validate() {
        if (this.minPrice !== null && isNaN(this.minPrice)) {
            throw new Error('Invalid minPrice');
        }
        if (this.maxPrice !== null && isNaN(this.maxPrice)) {
            throw new Error('Invalid maxPrice');
        }
        if (!['asc', 'desc'].includes(this.sort)) {
            throw new Error('Invalid sort option');
        }
    }

    toQueryOptions() {
        const queryOptions = {};

        if (this.query) {
            const sanitizedQuery = normalizeString(this.query);
            queryOptions.normalizedCategory = new RegExp(sanitizedQuery, 'i');
        }

        if (this.minPrice !== null || this.maxPrice !== null) {
            queryOptions.price = {};
            if (this.minPrice !== null) queryOptions.price.$gte = this.minPrice;
            if (this.maxPrice !== null) queryOptions.price.$lte = this.maxPrice;
        }

        return queryOptions;
    }

    toSortOptions() {
        const sortOptions = {};
        if (this.sort === 'asc' || this.sort === 'desc') {
            sortOptions.price = (this.sort === 'asc') ? 1 : -1;
        }


        return sortOptions;
    }
}
