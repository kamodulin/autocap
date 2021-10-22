from datetime import datetime
from flask import Flask

app = Flask(__name__)

@app.route('/api/test')
def test():
    return {'time': datetime.now().strftime("%B %d, %Y %I:%M%p")}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)