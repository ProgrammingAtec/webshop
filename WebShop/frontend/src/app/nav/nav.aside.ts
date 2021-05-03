export interface NavigationCategory {
    header: string;
    parent: string;
    children: Array<any>;
    path: string[]
}

export class Aside {
    categories: NavigationCategory[] = [
        {
            header: 'Women',
            parent: 'all',
            path: [],
            children: [
                {
                    header: 'Featured',
                    parent: 'Women',
                    path: [],
                    children: [
                        {
                            header: 'New',
                            parent: 'Featured',
                            path: [],
                            children: []
                        },
                        {
                            header: 'Sale',
                            parent: 'Featured',
                            path: [],
                            children: []
                        },
                        {
                            header: 'Tops & T-Shirts',
                            parent: 'Featured',
                            path: [],
                            children: []
                        },
                        {
                            header: 'Big & Tall',
                            parent: 'Featured',
                            path: [],
                            children: []
                        }
                    ]
                },
                {
                    header: 'Sweatsuits',
                    parent: 'Women',
                    path: [],
                    children: [
                        {
                            header: 'New',
                            parent: 'Sweatsuits',
                            path: [],
                            children: []
                        },
                        {
                            header: 'Sale',
                            parent: 'Sweatsuits',
                            path: [],
                            children: []
                        },
                        {
                            header: 'Tops & T-Shirts',
                            parent: 'Sweatsuits',
                            path: [],
                            children: []
                        },
                        {
                            header: 'Big & Tall',
                            parent: 'Sweatsuits',
                            path: [],
                            children: []
                        }
                    ]
                }
            ]
        },

        {
            header: 'Men',
            parent: 'all',
            path: [],
            children: [
                {
                    header: 'Featured',
                    parent: 'Men',
                    path: [],
                    children: [
                    {
                        header: 'New',
                        parent: 'Featured',
                        path: [],
                        children: []
                    },
                    {
                        header: 'Sale',
                        parent: 'Featured',
                        path: [],
                        children: []
                    },
                    {
                        header: 'Tops & T-Shirts',
                        parent: 'Featured',
                        path: [],
                        children: []
                    },
                    {
                        header: 'Big & Tall',
                        parent: 'Featured',
                        path: [],
                        children: []
                    }
                    ]
                },
                {
                    header: 'Sweatsuits',
                    parent: 'Men',
                    path: [],
                    children: [
                        {
                            header: 'New',
                            parent: 'Men',
                            path: [],
                            children: []
                        },
                        {
                            header: 'Sale',
                            parent: 'Men',
                            path: [],
                            children: []
                        },
                        {
                            header: 'Tops & T-Shirts',
                            parent: 'Men',
                            path: [],
                            children: []
                        },
                        {
                            header: 'Big & Tall',
                            parent: 'Men',
                            path: [],
                            children: []
                        }
                    ]
                }
            ]
        }
    ]

    constructor() {
        let pathGenerator = (categories: NavigationCategory[], currentPath: string[] = []) => {
            for (let category of categories) {
                category.path.push(...currentPath, category.header);

                if (category.children.length) {
                    pathGenerator(category.children, category.path);
                }
            }
        }

        pathGenerator(this.categories);
    }
}