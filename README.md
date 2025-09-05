# Markflow

A lightweight, real-time Markdown preview tool that watches your Markdown files and automatically updates the rendered HTML in your browser as you edit.

## Features

- **Live Preview**: Automatically refreshes browser view when you save changes to your Markdown file
- **GitHub Flavored Markdown**: Supports tables, strikethrough text, and other GFM features
- **Dark Theme**: Uses GitHub's dark markdown CSS for comfortable viewing
- **Zero Configuration**: Works out of the box with sensible defaults
- **Lightweight**: Minimal dependencies, fast startup
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Installation

### Global Installation (Recommended)

```bash
npm install -g markflow
```

### Local Installation

```bash
npm install markflow
```

## Usage

### Basic Usage

Simply point markflow to any Markdown file:

```bash
markflow README.md
```

This will:
1. Start a local server (default port 3000)
2. Open your browser with the rendered Markdown
3. Watch for changes and auto-refresh the browser

### Custom Port

You can specify a custom port using the `--port` or `-p` flag:

```bash
markflow README.md --port 8080
# or
markflow README.md -p 8080
```

### Help

Display help information:

```bash
markflow --help
# or
markflow -h
```

## How It Works

Markflow uses [BrowserSync](https://browsersync.io/) to create a local development server that:

1. Serves a single HTML page with your rendered Markdown content
2. Watches the specified Markdown file for changes
3. Automatically refreshes the browser when changes are detected
4. Uses [Showdown.js](https://github.com/showdownjs/showdown) to convert Markdown to HTML
5. Applies GitHub's markdown CSS for professional styling

## Supported Markdown Features

Markflow supports standard Markdown plus these enhanced features:

- **Tables**: Create tables using pipes and hyphens
- **Strikethrough**: Use `~~text~~` for ~~strikethrough~~
- **Task Lists**: Create checkboxes with `- [ ]` and `- [x]`
- **Code Highlighting**: Fenced code blocks with language specification
- **Proper List Indentation**: Supports 2-space indented sublists

## Development

### Prerequisites

- Node.js 14.0 or higher
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/silijon/markflow.git
cd markflow
```

2. Install dependencies:
```bash
npm install
```

3. Link for local development:
```bash
npm link
```

### Project Structure

```
markflow/
├── app.js           # Main application entry point
├── markflow/        # Static assets directory
│   └── index.html   # HTML template for rendering
├── package.json     # Project configuration
└── README.md        # This file
```

## API

Markflow exposes a simple HTTP endpoint when running:

- `GET /markdown` - Returns JSON with the current markdown file content:
  ```json
  {
    "location": "/absolute/path/to/file.md",
    "text": "# Markdown content..."
  }
  ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Bug Reports

If you find a bug, please report it at [GitHub Issues](https://github.com/silijon/markflow/issues).

## License

ISC License - see the [LICENSE](LICENSE) file for details.

## Author

John Dennis

## Links

- [GitHub Repository](https://github.com/silijon/markflow)
- [npm Package](https://www.npmjs.com/package/markflow)
- [Issue Tracker](https://github.com/silijon/markflow/issues)

## Changelog

### Version 0.0.3
- Latest stable release

### Version 0.0.2
- Added support for strikethrough and tables
- Fixed 2-space sublist indentation issue

### Version 0.0.1
- Initial release
- Basic markdown preview functionality